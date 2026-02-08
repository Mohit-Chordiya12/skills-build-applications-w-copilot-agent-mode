from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.db import transaction

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        with transaction.atomic():
            self.stdout.write(self.style.WARNING('Deleting old data...'))
            User.objects.all().delete()
            Team.objects.all().delete()
            Activity.objects.all().delete()
            Leaderboard.objects.all().delete()
            Workout.objects.all().delete()

            self.stdout.write(self.style.SUCCESS('Creating teams...'))
            marvel = Team.objects.create(name='Marvel')
            dc = Team.objects.create(name='DC')

            self.stdout.write(self.style.SUCCESS('Creating users...'))
            users = [
                User.objects.create(name='Iron Man', email='ironman@marvel.com', team='Marvel'),
                User.objects.create(name='Captain America', email='cap@marvel.com', team='Marvel'),
                User.objects.create(name='Batman', email='batman@dc.com', team='DC'),
                User.objects.create(name='Superman', email='superman@dc.com', team='DC'),
            ]

            from datetime import date
            self.stdout.write(self.style.SUCCESS('Creating activities...'))
            for user in users:
                Activity.objects.create(user=user.name, activity_type='Running', duration=30, date=date.today())
                Activity.objects.create(user=user.name, activity_type='Cycling', duration=45, date=date.today())

            self.stdout.write(self.style.SUCCESS('Creating workouts...'))
            Workout.objects.create(name='Full Body', description='A full body workout', difficulty='Medium')
            Workout.objects.create(name='Cardio Blast', description='High intensity cardio', difficulty='Hard')

            self.stdout.write(self.style.SUCCESS('Creating leaderboard...'))
            Leaderboard.objects.create(team='Marvel', points=190)
            Leaderboard.objects.create(team='DC', points=180)

            self.stdout.write(self.style.SUCCESS('Database populated with test data!'))
